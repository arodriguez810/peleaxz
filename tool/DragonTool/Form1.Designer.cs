namespace DragonTool
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnRunServer = new System.Windows.Forms.Button();
            this.button1 = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // btnRunServer
            // 
            this.btnRunServer.Location = new System.Drawing.Point(15, 15);
            this.btnRunServer.Margin = new System.Windows.Forms.Padding(6);
            this.btnRunServer.Name = "btnRunServer";
            this.btnRunServer.Size = new System.Drawing.Size(488, 113);
            this.btnRunServer.TabIndex = 0;
            this.btnRunServer.Text = "Run Server";
            this.btnRunServer.UseVisualStyleBackColor = true;
            this.btnRunServer.Click += new System.EventHandler(this.btnRunServer_Click);
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(15, 166);
            this.button1.Margin = new System.Windows.Forms.Padding(6);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(488, 39);
            this.button1.TabIndex = 1;
            this.button1.Text = "Migrate";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click_1);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 25F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(518, 242);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.btnRunServer);
            this.Font = new System.Drawing.Font("Microsoft Sans Serif", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Margin = new System.Windows.Forms.Padding(6);
            this.MinimizeBox = false;
            this.Name = "Form1";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btnRunServer;
        private System.Windows.Forms.Button button1;
    }
}

